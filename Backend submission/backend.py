from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import string, random
import pytz

app = Flask(__name__)
CORS(app)

url_store = {}  # {shortcode: {url, expiry, created, clicks: [log1, log2, ...]}}

IST = pytz.timezone("Asia/Kolkata")

def generate_shortcode(length=6):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

@app.route('/shorten', methods=['POST'])
def shorten_url():
    data = request.get_json()
    long_url = data.get('url')
    validity = int(data.get('validity', 30))
    custom_code = data.get('shortcode')

    if not long_url:
        return jsonify({"error": "URL is required"}), 400

    if custom_code:
        if custom_code in url_store:
            return jsonify({"error": "Shortcode already exists"}), 409
        shortcode = custom_code
    else:
        while True:
            shortcode = generate_shortcode()
            if shortcode not in url_store:
                break

    created = datetime.now(IST)
    expiry = created + timedelta(minutes=validity)

    url_store[shortcode] = {
        "url": long_url,
        "created": created.isoformat(),
        "expiry": expiry.isoformat(),
        "clicks": []  # Will hold logs like {'time': ..., 'source': ...}
    }

    return jsonify({
        "shortcode": shortcode,
        "short_url": f"http://localhost:5173/{shortcode}",
        "expiry": expiry.isoformat()
    })

@app.route('/resolve/<shortcode>', methods=['GET'])
def resolve_url(shortcode):
    entry = url_store.get(shortcode)
    if not entry:
        return jsonify({"error": "Shortcode not found"}), 404

    now = datetime.now(IST)
    expiry_time = datetime.fromisoformat(entry["expiry"])
    if now > expiry_time:
        return jsonify({"error": "Shortcode expired"}), 410

    # Log click
    click_info = {
        "time": now.isoformat(),
        "source": request.headers.get("Referer", "Direct")
    }
    entry["clicks"].append(click_info)

    return jsonify({"url": entry["url"]})

@app.route('/stats', methods=['GET'])
def get_stats():
    stats = []
    for code, info in url_store.items():
        stats.append({
            "shortcode": code,
            "original_url": info["url"],
            "created": info["created"],
            "expiry": info["expiry"],
            "click_count": len(info["clicks"]),
            "clicks": info["clicks"]
        })
    return jsonify(stats)

if __name__ == '__main__':
    app.run(debug=True)
