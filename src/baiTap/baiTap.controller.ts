import { Controller, Get } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaiTapService } from './baiTap.service';

@ApiTags('baiTaps')
@Controller('baiTaps')
export class BaiTapController {
  constructor(private readonly baiTapService: BaiTapService) {}

  // Câu 1: Liệt kê danh sách các lớp của khoa, thông tin cần Malop, TenLop, MaKhoa
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau1')
  async cau1() {
    const cau1 = await this.baiTapService.cau1();
    return cau1;
  }

  // Câu 2: Lập danh sách sinh viên gồm: MaSV, HoTen, HocBong
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau2')
  async cau2() {
    const cau2 = await this.baiTapService.cau2();
    return cau2;
  }

  // Câu 3: Lập danh sách sinh viên có học bổng. Danh sách cần MaSV, Nu, HocBong
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau3')
  async cau3() {
    const cau3 = await this.baiTapService.cau3();
    return cau3;
  }

  // Câu 4: Lập danh sách sinh viên nữ. Danh sách cần các thuộc tính của quan hệ sinhvien
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau4')
  async cau4() {
    const cau4 = await this.baiTapService.cau4();
    return cau4;
  }

  // Câu 5: Lập danh sách sinh viên có họ 'Trần'
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau5')
  async cau5() {
    const cau5 = await this.baiTapService.cau5();
    return cau5;
  }

  // Câu 6: Lập danh sách sinh viên nữ có học bổng
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau6')
  async cau6() {
    const cau6 = await this.baiTapService.cau6();
    return cau6;
  }

  // Câu 7: Lập danh sách sinh viên nữ hoặc danh sách sinh viên có học bổng
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau7')
  async cau7() {
    const cau7 = await this.baiTapService.cau7();
    return cau7;
  }

  // Câu 8: Lập danh sách sinh viên có năm sinh từ 1978 đến 1985. Danh sách cần các thuộc tính của quan hệ SinhVien
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau8')
  async cau8() {
    const cau8 = await this.baiTapService.cau8();
    return cau8;
  }

  // Câu 9: Liệt kê danh sách sinh viên được sắp xếp tăng dần theo MaSV
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau9')
  async cau9() {
    const cau9 = await this.baiTapService.cau9();
    return cau9;
  }

  // Câu 10: Liệt kê danh sách sinh viên được sắp xếp giảm dần theo HocBong
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau10')
  async cau10() {
    const cau10 = await this.baiTapService.cau10();
    return cau10;
  }

  // Câu 11: Lập danh sách sinh viên có điểm thi môn CSDL>=8
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau11')
  async cau11() {
    const cau11 = await this.baiTapService.cau11();
    return cau11;
  }

  // Câu 12: Lập danh sách sinh viên có học bổng của khoa CNTT. Thông tin cần: MaSV, HoTen, HocBong,TenLop
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau12')
  async cau12() {
    const cau12 = await this.baiTapService.cau12();
    return cau12;
  }

  // Câu 13: Lập danh sách sinh viên có học bổng của khoa CNTT. Thông tin cần: MaSV, HoTen, HocBong,TenLop, TenKhoa
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau13')
  async cau13() {
    const cau13 = await this.baiTapService.cau13();
    return cau13;
  }

  // Câu 14: Cho biết số sinh viên của mỗi lớp
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau14')
  async cau14() {
    const cau14 = await this.baiTapService.cau14();
    return cau14;
  }

  // Câu 15: Cho biết số lượng sinh viên của mỗi khoa.
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau15')
  async cau15() {
    const cau15 = await this.baiTapService.cau15();
    return cau15;
  }

  // Câu 16: Cho biết số lượng sinh viên nữ của mỗi khoa.
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau16')
  async cau16() {
    const cau16 = await this.baiTapService.cau16();
    return cau16;
  }

  // Câu 17: Cho biết tổng tiền học bổng của mỗi lớp
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau17')
  async cau17() {
    const cau17 = await this.baiTapService.cau17();
    return cau17;
  }

  // Câu 18: Cho biết tổng số tiền học bổng của mỗi khoa
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau18')
  async cau18() {
    const cau18 = await this.baiTapService.cau18();
    return cau18;
  }

  // Câu 19: Lập danh sánh những khoa có nhiều hơn 100 sinh viên. Danh sách cần: MaKhoa, TenKhoa, Soluong
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau19')
  async cau19() {
    const cau19 = await this.baiTapService.cau19();
    return cau19;
  }

  // Câu 20: Lập danh sánh những khoa có nhiều hơn 50 sinh viên nữ. Danh sách cần: MaKhoa, TenKhoa, Soluong
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau20')
  async cau20() {
    const cau20 = await this.baiTapService.cau20();
    return cau20;
  }

  // Câu 21: Lập danh sách những khoa có tổng tiền học bổng >=1000000.
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau21')
  async cau21() {
    const cau21 = await this.baiTapService.cau21();
    return cau21;
  }

  // Câu 22: Lập danh sách sinh viên có học bổng cao nhất
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau22')
  async cau22() {
    const cau22 = await this.baiTapService.cau22();
    return cau22;
  }

  // Câu 23: Lập danh sách sinh viên có điểm thi môn CSDL cao nhất
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau23')
  async cau23() {
    const cau23 = await this.baiTapService.cau23();
    return cau23;
  }

  // Câu 24: Lập danh sách những sinh viên không có điểm thi môn CSDL.
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau24')
  async cau24() {
    const cau24 = await this.baiTapService.cau24();
    return cau24;
  }

  // Câu 25: Cho biết những khoa nào có nhiều sinh viên nhất
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('cau25')
  async cau25() {
    const cau25 = await this.baiTapService.cau25();
    return cau25;
  }
}
