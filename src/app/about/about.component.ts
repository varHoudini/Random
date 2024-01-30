import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  topStories: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => response.json())
      .then((data: number[]) => {
        console.log(data);
        if (data && data.length > 0) {

          const topStoryIds = data.slice(0, 10);
          this.fetchStoryDetails(topStoryIds);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  fetchStoryDetails(storyIds: number[]) {
    Promise.all(storyIds.map(storyId =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
        .then(response => response.json())
    ))
    .then(stories => {
      console.log(stories);
      this.topStories = stories;
    })
    .catch(error => console.error('Error fetching story details:', error));
  }
}
