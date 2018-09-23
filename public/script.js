const displayResult = () => {
	console.log('displayResult');
	const baseUrl = window.location;
	const userId = document.getElementById('userIdLog').value;
	const from = document.getElementById('from').value || null;
	const to = document.getElementById('to').value || null;
	const limit = document.getElementById('limit').value || null;
	console.log(userId, to, from, limit);
	let generatedUrl = `${baseUrl}api/exercise/log?userId=${userId}`;
	if (from) {generatedUrl += `&from=${from}`};
	if (to) {generatedUrl += `&to=${to}`};
	if (limit) {generatedUrl += `&limit=${limit}`};
	console.log(generatedUrl);
	document.getElementById('result').innerHTML = `<h3 class="subhead">Click link below to get user log</h3><a href=${generatedUrl} target="blank">${generatedUrl}</a>`;
}