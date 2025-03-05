import { Component } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-scan-disease',
  templateUrl: 'scan-disease.page.html',
  styleUrls: ['scan-disease.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    SharedModule,
    HeaderComponent,
    BaseChartDirective,
    TabsComponent,
  ],
})
export class ScanDiseasePage {
  constructor() {}

  barChartData: ChartData<'bar'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        data: [20, 14, 17, 5, 25],
        borderColor: '#3800F1',
        backgroundColor: '#3800F1',
        borderRadius: 16,
        borderSkipped: false,
        minBarLength: 64,
        barPercentage: 1.05,
      },
    ],
  };
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    hover: {
      mode: null as any,
    },
    interaction: {
      mode: 'index',
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    animation: {
      onComplete: function () {
        const height = this.boxes[0].bottom;
        this.data.datasets.forEach((dataset, datasetIndex) => {
          const meta = this.getDatasetMeta(datasetIndex);
          meta.data.forEach((bar, index) => {
            this.ctx.save();

            const data = String(dataset.data[index]);

            this.ctx.font = "700 2rem 'Anek Gurmukhi'";
            this.ctx.fillStyle = 'rgb(103, 118, 255, 1)';
            this.ctx.fillText(data.padStart(2, '0'), bar.x - 16, bar.y + 32);

            this.ctx.restore();

            if (this.data.labels) {
              const label = this.data.labels[index] as string;

              this.ctx.font = "600 0.625rem 'Anek Gurmukhi'";
              this.ctx.fillStyle = 'rgb(245, 242, 255, 1)';

              this.ctx.fillText(label, bar.x - 10, height - height / 16);

              this.ctx.restore();
            }
          });
        });
      },
    },
  };
}
