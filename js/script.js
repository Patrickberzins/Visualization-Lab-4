d3.csv('wealth-health-2014.csv', d3.autoType).then(data=>{
	countryArray = [];
	lifeArray = [];
	incomeArray = [];
	popArray = [];
	regionArray = [];

	console.log('wealth', data);

	for (let i = 0; i < data.length; i++){
		countryArray.push(data[i].Country)
		lifeArray.push(data[i].LifeExpectancy)
		incomeArray.push(data[i].Income)
		popArray.push(data[i].Population)
		regionArray.push(data[i].Region)
	}
	const incomeExt = d3.extent(incomeArray);
	const lifeExt = d3.extent(lifeArray);
	console.log('incomeExt', incomeExt);
	console.log('lifeExt', lifeExt);

	let incomeMin = incomeExt[0]
	let incomeMax = incomeExt[1]

	let lifeMin = lifeExt[0]
	let lifeMax = lifeExt[1]

	const width = 700;
	const height = 700;
	d3.select('.chart').append('svg')
	.attr('width', width)
    .attr('height', height)

	const yScale = d3
    .scaleLinear()
    .domain([lifeMin,lifeMax])
    .range([0,700]) 

	const xScale = d3
    .scaleLinear()
    .domain([incomeMin,incomeMax])
    .range([0,700]) 

	console.log(xScale(incomeMax));
	console.log(yScale(lifeMax));

	console.log(data.Country)

	d3.selectAll(".chart")

})

