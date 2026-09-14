import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Container } from '../../components/container/container';

@Component({
  selector: 'app-not-found',
  imports: [Container, RouterLink],
  templateUrl: './not-found.html',
})
export default class NotFound {}
