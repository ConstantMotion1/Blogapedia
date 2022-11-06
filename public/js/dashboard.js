const newFormHandler = async (event) => {
    event.preventDefault();
  
    const post_title = document.querySelector('#title').value.trim();
    const post_content = document.querySelector('#content').value.trim();
    
  
    if (post_title && post_content) {
      const response = await fetch(`/api/myblogs`, {
        method: 'POST',
        body: JSON.stringify({ post_title, post_content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create blog');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    console.log(event)
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id)
      const response = await fetch(`/api/myblogs/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog');
      }
    }
  };

  // const updateButtonHandler = async (event) => {
  //   console.log(event)
  //   if (event.target.hasAttribute('data-id')) {
  //     const id = event.target.getAttribute('data-id');
  //     console.log(id)
  //     const response = await fetch(`/update/${id}`, {
  //       method: 'GET',
  //     });
  //     console.log(response)
  //     if (response.ok) {
  //       document.location.replace('/update');
  //     } else {
  //       alert('Failed to update blog');
  //     }
  //   }
  // };
  
  document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);
  
  // document
  //   .querySelector('.blog-list')
  //   .addEventListener('click', delButtonHandler);

    [...document.querySelectorAll(".blog-list")].forEach((el) =>
    el.addEventListener("click", delButtonHandler)
  );
  
//   [...document.querySelectorAll(".update-list")].forEach((el) =>
//   el.addEventListener("click", updateButtonHandler)
// );