FROM python:3.8.10

WORKDIR /gunicorn
COPY . .
RUN pip install .

CMD ["gunicorn", "yt_subtitles.app:app", "--bind", "0.0.0.0:8000"]