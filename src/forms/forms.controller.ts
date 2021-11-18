import { Controller, Post, Get, Patch, Delete, NotFoundException, Param, Body } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormsDto } from './dtos/create-forms.dto';
import { CurrentForm } from './current-form.decorator';

@Controller('forms')
export class FormsController {
    constructor(private formsService: FormsService) {}
    @Get()
    getAllForms() {
        return this.formsService.getAll();
    }

    @Get('/current')
    getCurrent(@CurrentForm() form: string) {
        return form;
    }
    @Get('/create')
    create() {
        return this.formsService.create();
    }
    @Patch('/change')
    change(@Body() body: CreateFormsDto) {

    }
    @Get('/:id')
    async getById(@Param('id') id: string) {
        console.log('controller id', id);
        const record = await this.formsService.findOne(parseInt(id));
        if(!record) {
            throw new NotFoundException('record not found');
        }
        return record;
    }
    @Patch('/:id')
    updateImportant(@Param('id') id: string) {
        console.log('update imp for id ', id);
        return this.formsService.updImp(parseInt(id));
    }
    @Patch('children/:id')
    updateChildren(@Param('id') id: string) {
        console.log('update ch for id ', id);
        return this.formsService.updChi(parseInt(id));
    }
    @Delete('/:id')
    async deleteRecord(@Param('id') id: string) {
        const records = await this.formsService.deleteRecord(parseInt(id));
        return records;
    }
}
