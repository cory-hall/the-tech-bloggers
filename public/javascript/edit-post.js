// edit a post
async function editFormHandler(event) {
  event.preventDefault();

  // get title from webpage
  const title = document.querySelector('input[name="post-title"]').value.trim();
  // get content from webpage
  const content = document.querySelector('input[name="content"]').value.trim();
  // get id from url (last char)
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // use await for the api call
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      post_id: id,
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }

}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);