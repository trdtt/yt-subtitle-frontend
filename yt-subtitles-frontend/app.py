from yt_subtitles.yt_extractor.extractor import extract_formatted_subtitles
from flask import Flask, render_template, request, send_file, jsonify
from urllib.parse import urlparse, parse_qs
from flask_cors import CORS
from typing import Union
import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/data_input', methods=['POST'])
def data_input():
    video_id = extract_video_id(request.form['video_id'])
    lang = request.form['lang']
    # option = request.form['option']

    if not video_id:
        return jsonify({
            'status': 'failure',
            'error': 'UrlError'
        })

    try:
        subt = extract_formatted_subtitles(video_id, lang)

        return jsonify({
            'status': 'successful',
            'subtitles': subt
        })
    except Exception as err:
        logging.info('Error while downloading: ')
        logging.info(err)

        return jsonify({
            'status': 'failure',
            'error': 'UnknownError'
        })


def extract_video_id(video_id: str) -> Union[str, None]:
    """
    https://stackoverflow.com/questions/4356538/how-can-i-extract-video-id-from-youtubes-link-in-python

    Examples:
    - http://youtu.be/SA2iWivDJiE
    - http://www.youtube.com/watch?v=_oPAwA_Udwc&feature=feedu
    - http://www.youtube.com/embed/SA2iWivDJiE
    - http://www.youtube.com/v/SA2iWivDJiE?version=3&amp;hl=en_US
    """
    query = urlparse(video_id)
    if query.hostname == 'youtu.be':
        return query.path[1:]
    if query.hostname in ('www.youtube.com', 'youtube.com'):
        if query.path == '/watch':
            p = parse_qs(query.query)
            return p['v'][0]
        if query.path[:7] == '/embed/':
            return query.path.split('/')[2]
        if query.path[:3] == '/v/':
            return query.path.split('/')[2]
    # fail
    return None
