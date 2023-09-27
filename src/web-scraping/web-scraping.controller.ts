import { Controller, Get } from '@nestjs/common';
import { WebScrapingService } from './web-scraping.service';

@Controller('web-scraping')
export class WebScrapingController {
    constructor(private service: WebScrapingService) { }

    @Get()
    async webScraping(): Promise<any> {
        const data = await this.service.webScrapping()
        return data
    }
}
