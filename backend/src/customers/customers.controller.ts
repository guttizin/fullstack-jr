import { Controller, Get, Post, Body, Param, Delete, Patch, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Post()
    create(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customersService.create(createCustomerDto);
    }

    @Post('check-email')
    @HttpCode(HttpStatus.OK)
    async checkEmail(@Body('email') email: string) {
        const customer = await this.customersService.findByEmail(email);
        return { exists: !!customer, customer: customer || null };
    }

    @Get()
    findAll() {
        return this.customersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.customersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
        return this.customersService.update(id, updateCustomerDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.customersService.remove(id);
    }
} 