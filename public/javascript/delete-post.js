// delete a post
async function deleteFormHandler(event) {
  event.preventDefault();

  // get id from url (last char)
  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    
    // use await for the api call
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        post_id: id
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

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);