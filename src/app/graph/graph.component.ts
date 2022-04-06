import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  @Input() showModal;
  @Input() graphVal;
  @Output() closeModel: EventEmitter<boolean> = new EventEmitter();

  public width: number = 200;
  public height: number = 200;
  public margin: number = 50;
  public radius: number;
  public svg: any;
  public color: any;
  public pie: any;
  public data_ready: number;

  // Create dummy data
  public data: any;
  constructor() {}

  public ngOnInit(): void {
    this.draw();
    console.log('showModal', this.showModal);
    console.log('element', this.graphVal);
  }
  public draw(): void {
    this.data = {
      a: this.graphVal.availableUnits,
      b: this.graphVal.unitPrice,
    };
    this.radius = Math.min(this.width, this.height) / 2 - this.margin;
    this.svg = d3
      .select('#mychart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );

    // set the color scale
    this.color = d3
      .scaleOrdinal()
      .domain(Object.keys(this.data))
      .range(['#CB72D8', '#347ac0']);

    // Compute the position of each group on the pie:
    this.pie = d3.pie().value(function (d) {
      return d.value;
    });
    this.data_ready = this.pie(d3.entries(this.data));

    // creating chart
    this.svg
      .selectAll()
      .data(this.data_ready)
      .enter()
      .append('path')
      .attr(
        'd',
        d3
          .arc()
          .innerRadius(80) // This is the size of the donut hole
          .outerRadius(this.radius)
      )
      .attr('fill', (d) => {
        return this.color(d.data.key);
      })
      .attr('stroke', 'white')
      .style('stroke-width', '4px');

    // chart labels
    const labelLocation = d3.arc().innerRadius(82).outerRadius(this.radius);
    this.svg
      .selectAll()
      .data(this.data_ready)
      .enter()
      .append('text')
      .text((d) => d.data.value)
      .attr('transform', (d) => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('font-weight', '600')
      .attr('fill', 'white')
      .style('font-size', 15);

    this.svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.25em')
      .attr('y', -10)
      .style('font-weight', '600')
      .text('Avaiable');

    this.svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.25em')
      .attr('y', 8)
      .style('font-weight', '600')
      .text('per unit price');

    this.svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('y', 33)
      .attr('id', 'userstoryrraCentercount')
      .attr('font-family', "'Graphik', Arial, sans-serif")
      .attr('font-size', '15px')
      .attr('fill', 'rgba(black)')
      // .text(parseInt(this.openUserStory) + parseInt(this.closeduserStory))
      // .text('text')
      .style('font-weight', '600');
  }

  public onClose(): void {
    this.showModal = false;
    this.closeModel.emit(this.showModal);
  }
}
