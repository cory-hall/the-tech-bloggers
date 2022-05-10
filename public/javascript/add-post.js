// add a post
async function newFormHandler(event) {
  event.preventDefault();

  // get title from webpage
  const title = document.querySelector('input[name="post-title"]').value;
  // get comment content from webpage
  const content = document.querySelector('input[name="content"]').value;

  // use await for the api call
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);