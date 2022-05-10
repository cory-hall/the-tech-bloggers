// add a comment
async function commentFormHandler(event) {
  event.preventDefault();

  // get comment_text from webpage
  const comment_text = document.querySelector('input[name="comment-body"]').value.trim();
  // get id from url (last char)
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // prevent user from submitting an empty comment
  if (comment_text) {
    // use await for the api call
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.reload();

    } else {
      alert(response.statusText);
      document.querySelector('#comment-form').style.display = "block";
    }
  }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);