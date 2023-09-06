const btnlogout = document.getElementById('link6');

btnlogout.addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:3000/logout');
    console.log(response);
    if (response.redirected) {
      window.location.href = response.url;
    }
  } catch (err) {
    console.log(err);
  }
});
