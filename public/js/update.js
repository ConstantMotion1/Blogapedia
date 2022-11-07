const updateButtonHandler = async (event) => {
  const updTitle = document.getElementById("title").value.trim();
  const updContent = document.getElementById("content").value.trim();
  {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/myblogs/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        updTitle,
        updContent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("has been updated");
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update blog");
    }
  }
};

const updBtn = document.getElementById("update");
updBtn.addEventListener("click", updateButtonHandler);
