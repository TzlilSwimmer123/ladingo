import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DateProvider} from '../providers/dateProvider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  trackingData: any;
  trackingDetails =  {};
  trackingDetailsDates = [];
  unRelevantFields = ['id', 'item_id', 'tracking_id', 'date_created'];
  fullDetails = false;

  constructor(private http: HttpClient, private dateProvider: DateProvider) {
    const trackingID = this.getParams('item_id');
    if (trackingID) {
      this.http.get('http://127.0.0.1:3000/details?item_id=' + trackingID).subscribe(data => {
          if (data && data.results.length > 0) {
            const completion = document.getElementsByClassName('order-status-timeline-completion')[0] as HTMLDivElement;
            this.trackingData = data.results[0];
            let stage = 0;
            const now = new Date();

            for (const stepTitle of Object.keys(this.trackingData)) {
              if (this.trackingData[stepTitle] && this.unRelevantFields.indexOf(stepTitle) === -1) {
                const formattedDate = this.dateProvider.formatDate(new Date(this.trackingData[stepTitle]));
                if (Object.keys(this.trackingDetails).indexOf(formattedDate) === -1) {
                  this.trackingDetails[formattedDate] = [this.trackingData[stepTitle]];
                } else {
                  this.trackingDetails[formattedDate].push(this.trackingData[stepTitle]);
                  this.trackingDetails[formattedDate].sort( (a, b) => {
                    return new Date(b.date) - new Date(a.date);
                  });
                }
              }
            }

            this.trackingDetailsDates = Object.keys(this.trackingDetails);

            if (data.results[0]) {
              const tracking = data.results[0];
              if (tracking.entered_exit_port && now >= new Date(tracking.entered_exit_port)) {
                stage++;
              }

              if (tracking.loaded_on_ship && now >= new Date(tracking.loaded_on_ship)) {
                stage++;
              }

              if (tracking.ship_left_the_harbor && now >= new Date(tracking.ship_left_the_harbor)) {
                stage++;
              }

              if (tracking.item_delivered && now >= new Date(tracking.item_delivered)) {
                stage++;
              }

              completion.style.width = (24 * stage).toString() + '%';

            }
          } else {
            window.alert('Tracking ID does not exists');
          }

        },
        err => {

        });
    }

  }

  getParams(name) {
    const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!results) {
      return 0;
    }
    return results[1] || 0;
  }

  getStepTitle(date) {
    for (const step of Object.keys(this.trackingData)) {
      if (this.trackingData[step] === date) {
        return step.replace(/_/g, ' ');
      }
    }
  }

  showDetails() {
    this.fullDetails = !this.fullDetails;
  }
}
