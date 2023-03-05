$(document).ready(function () {
    $('#download-button').prop('disabled', true)

    $('#video_url').change(function () {
        enableDownload()
    })

    $('#lang-button').change(function () {
        enableDownload()
        $('#lang-button').css('color', 'black')
    })

    $('#options-button').change(function () {
        ('#lang-button').css('color', 'black')
    })

    $('#download-button').on('click', function () {
        $(this).prop('disabled', true)
        $(this).html(
            `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
        )

        $.post('/data_input',
            {
                video_id: $('#video_url').val(),
                lang: $('#lang-button').find(':selected').val(),
                option: $('#options-button').val()
            },
            async function (data, status) {
                await getTitle()
                    .then((title) => {
                        if (data['status'] === 'successful')
                            download(data['subtitles'], title)
                        else
                            errormsg(data['error'])

                        $('#download-button').html('Download')
                    })

                $('#video_url').val('')
                $('#lang-button').val('0').change()
            })
    })
})

function errormsg(error) {
    const urlError = `The URL you provided could not be processed. 
    Make sure it is a Youtube link in one of the following formats:
    - https://youtu.be/...
    - https://www.youtube.com/watch?v=...
    - https://www.youtube.com/embed/...
    - https://www.youtube.com/v/...
    `

    const unknownError = `Unfortunately, the video could not be processed.
    Please change the settings or select another video.`

    if (error === 'UrlError') {
        $('#errormsg').children('.toast-body').html(urlError)
    } else {
        $('#errormsg').children('.toast-body').html(unknownError)
    }

    new bootstrap.Toast($('#errormsg')).show()
}

function getTitle() {
    const url = $('#video_url').val()

    return fetch(`https://noembed.com/embed?dataType=json&url=${url}`)
        .then(res => res.json())
        .then(data => data.title)
}

function enableDownload() {
    if ($('#video_url').val() && ($('#lang-button').find(':selected').val() !== '0'))
        $('#download-button').prop('disabled', false)
    else
        $('#download-button').prop('disabled', true)
}

function download(subtitles, title) {
    const element = document.createElement('a')
    const file = new Blob([subtitles], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = title + '.txt'
    document.body.appendChild(element)
    element.click()
}
