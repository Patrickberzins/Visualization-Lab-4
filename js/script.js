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
	const popExt = d3.extent(popArray);
	console.log('incomeExt', incomeExt);
	console.log('lifeExt', lifeExt);

	let incomeMin = incomeExt[0]
	let incomeMax = incomeExt[1]

	let lifeMin = lifeExt[0]
	let lifeMax = lifeExt[1]

	let popMin = popExt[0]
	let popMax = popExt[1]

	const margin = ({top: 20, right: 20, bottom: 40, left: 60})

	const width = 850 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

	const svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	const xScale = d3
    .scaleLinear()
    .domain([incomeMin,incomeMax])
    .range([0,650]) 

	const yScale = d3
    .scaleLinear()
    .domain([lifeMax,lifeMin])
    .range([0,500]) 

	const popScale = d3
    .scaleLinear()
    .domain([popMin,popMax])
    .range([3,40]) 

	const colorScale = d3.scaleOrdinal(d3.schemeTableau10)


	console.log(xScale(incomeMax));
	console.log(yScale(lifeMax));

	console.log(data.Country)

	

	svg.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', d=>xScale(d.Income))
  		.attr('cy', d=>yScale(d.LifeExpectancy))
  		.attr('r', d=>popScale(d.Population))
  		.attr('stroke', 'black')
  		.attr('fill', d=>colorScale(d.Region))
		.attr("fill-opacity","0.5")
		.on("mouseover", function(event, d) {

			const pos = d3.pointer(event, window)

			var addComma = d3.format(",")
	  
			//Update the tooltip position and value
			d3.select(".tooltip")
			  .style("left", pos[0] + "px")
			  .style("top", pos[1] + "px")
			  .html(

				"Country: " + d.Country +"<br>" + 
				"Region: " + d.Region +"<br>" + 
				"Population: " + addComma(d.Population) +"<br>" + 
				"Income: " + addComma(d.Income) +"<br>" + 
				"LifeExpectancy: " + d.LifeExpectancy +"<br>"

			  );
	  
			//Show the tooltip
			d3.select(".tooltip").classed("hidden", false);
			

		  })
		  .on("mouseout", function(d) {
			//Hide the tooltip
			d3.select(".tooltip").classed("hidden", true);
		  });

	

	const xAxis = d3.axisBottom()
	.scale(xScale)
	.ticks(10, "s")

	svg.append("g")
	.attr("class", "axis x-axis")
	.call(xAxis)
	.attr("transform", `translate(0, ${height - margin.bottom})`)

	const yAxis = d3.axisLeft()
	.scale(yScale)
	.ticks(10, "s")

	svg.append("g")
	.attr("class", "axis y-axis")
	.call(yAxis)
	.attr("transform", `translate(0, 0)`)

	svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -50)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Life Expectancy");

	svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 120)
    .attr("y", height)
    .text("Income");


	svg.append('rect')
		.attr('x', 500)
  		.attr('y', 475)
  		.attr('width', 15)
  		.attr('height', 15)
  		.attr('stroke', 'black')
  		.attr('fill', '#BCDBD8');

	svg.append('rect')
		.attr('x', 500)
  		.attr('y', 450)
  		.attr('width', 15)
  		.attr('height', 15)
  		.attr('stroke', 'black')
  		.attr('fill', '#FAC79B');

	svg.append('rect')
		.attr('x', 500)
  		.attr('y', 425)
  		.attr('width', 15)
  		.attr('height', 15)
  		.attr('stroke', 'black')
  		.attr('fill', '#A7BBD3');
		  
	svg.append('rect')
		.attr('x', 500)
  		.attr('y', 400)
  		.attr('width', 15)
  		.attr('height', 15)
  		.attr('stroke', 'black')
  		.attr('fill', '#F6E4A8')
		.text("Hello");

	svg.append('rect')
		.attr('x', 500)
  		.attr('y', 375)
  		.attr('width', 15)
  		.attr('height', 15)
  		.attr('stroke', 'black')
  		.attr('fill', '#F2ACAC');

	svg.append('rect')
		.attr('x', 500)
  		.attr('y', 350)
  		.attr('width', 15)
  		.attr('height', 15)
  		.attr('stroke', 'black')
  		.attr('fill', '#ADD0A7');

	svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 180)
    .attr("y", 363)
    .text("America");

	svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 90)
    .attr("y", 388)
    .text("East Asia and Pacific");
		
	svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 70)
    .attr("y", 413)
    .text("Europe and Central Asia");
		
	svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 105)
    .attr("y", 438)
    .text("Sub-Saharan Africa");
		
	svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 165)
    .attr("y", 463)
    .text("South Asia");
		
	svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 37)
    .attr("y", 488)
    .text("Middle East and North Africa");
		
		

})

