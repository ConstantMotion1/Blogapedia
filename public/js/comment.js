const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const post_comment = document.querySelector('input[name="content-body"]').value.trim();
    
    // const id = event.target.getAttribute('data-id');
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]
    console.log(id)
    if (post_comment) {
        console.log('hi im here')
     const response =  await fetch(`/api/comments/`, {
        method: 'POST',
        body: JSON.stringify({ post_comment, blog_id:id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  };

  document
    .getElementById('cmtclick')
    .addEventListener('click', commentFormHandler);