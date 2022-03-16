import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KetQua, KetQuaDocument } from 'src/ketQua/schemas/ketQua.schema';
import { Khoa, KhoaDocument } from 'src/khoa/schemas/khoa.schema';
import { Lop, LopDocument } from 'src/lop/schemas/lop.schema';
import { MonHoc, MonHocDocument } from 'src/monHoc/schemas/monHoc.schema';
import {
  SinhVien,
  SinhVienDocument,
} from 'src/sinhVien/schemas/sinhVien.schema';

// SinhVien(MaSV, HoTen, Nu, NgaySinh, MaLop, HocBong, Tinh)
// Lop(MaLop, TenLop, MaKhoa)
// Khoa(MaKhoa, TenKhoa, SoCBGD)
// MonHoc(MaMH, TenMH, SoTiet)
// KetQua(MaSV, MaMH, DiemThi)

@Injectable()
export class BaiTapService {
  constructor(
    @InjectModel(Khoa.name) private readonly khoaModel: Model<KhoaDocument>,
    @InjectModel(Lop.name) private readonly lopModel: Model<LopDocument>,
    @InjectModel(SinhVien.name)
    private readonly sinhVienModel: Model<SinhVienDocument>,
    @InjectModel(MonHoc.name)
    private readonly monHocModel: Model<MonHocDocument>,
    @InjectModel(KetQua.name)
    private readonly ketQuaModel: Model<KetQuaDocument>,
  ) {}

  // Câu 1: Liệt kê danh sách các lớp của khoa, thông tin cần Malop, TenLop, MaKhoa
  async cau1() {
    const cau1 = await this.lopModel.find();
    return cau1;
  }

  // Câu 2: Lập danh sách sinh viên gồm: MaSV, HoTen, HocBong
  async cau2() {
    const cau2 = await this.sinhVienModel.find().select('id hoTen hocBong');
    return cau2;
  }

  // Câu 3: Lập danh sách sinh viên có học bổng. Danh sách cần MaSV, Nu, HocBong
  async cau3() {
    const cau3 = await this.sinhVienModel
      .find({
        hocBong: { $gt: 0 },
        nu: true,
      })
      .select('id nu hocBong');
    return cau3;
  }

  // Câu 4: Lập danh sách sinh viên nữ. Danh sách cần các thuộc tính của quan hệ sinhvien
  async cau4() {
    const cau4 = await this.sinhVienModel
      .find()
      .populate({ path: 'maLop', select: 'id tenLop' });
    return cau4;
  }

  // Câu 5: Lập danh sách sinh viên có họ 'Trần'
  async cau5() {
    const ho = 'Sinh ';
    const keyword = new RegExp(`^${ho.trim()} `, 'i');
    const cau5 = await this.sinhVienModel.find({ hoTen: keyword });
    return cau5;
  }

  // Câu 6: Lập danh sách sinh viên nữ có học bổng
  async cau6() {
    const cau6 = await this.sinhVienModel.find({
      nu: true,
      hocBong: { $gt: 0 },
    });
    return cau6;
  }

  // Câu 7: Lập danh sách sinh viên nữ hoặc danh sách sinh viên có học bổng
  async cau7() {
    const cau7 = this.sinhVienModel.find({
      $or: [{ nu: true }, { hocBong: { $gt: 0 } }],
    });
    return cau7;
  }

  // Câu 8: Lập danh sách sinh viên có năm sinh từ 1978 đến 1985. Danh sách cần các thuộc tính của quan hệ SinhVien
  async cau8() {
    const cau8 = await this.sinhVienModel
      .find({
        ngaySinh: {
          $gte: new Date('1/1/1978'),
          $lt: new Date('1/1/2002'),
        },
      })
      .populate({ path: 'maLop', select: 'id tenLop' });
    return cau8;
  }

  // Câu 9: Liệt kê danh sách sinh viên được sắp xếp tăng dần theo MaSV
  async cau9() {
    const cau9 = await this.sinhVienModel.find().sort('id');
    return cau9;
  }

  // Câu 10: Liệt kê danh sách sinh viên được sắp xếp giảm dần theo HocBong
  async cau10() {
    const cau10 = await this.sinhVienModel.find().sort('-hocBong');
    return cau10;
  }

  // Câu 11: Lập danh sách sinh viên có điểm thi môn CSDL>=8
  async cau11() {
    const monCSDLId = '62300411ed9b0c051eae6067';
    const cau11 = await this.ketQuaModel
      .find({ diemThi: { $gte: 8 }, maMH: monCSDLId })
      .populate('maSV')
      .populate({ path: 'maMH', select: 'id tenMH' });
    return cau11;
  }

  // Câu 12: Lập danh sách sinh viên có học bổng của khoa CNTT. Thông tin cần: MaSV, HoTen, HocBong,TenLop
  async cau12() {
    const cau12 = 'await this.baiTapService.cau12()';
    return cau12;
  }

  // Câu 13: Lập danh sách sinh viên có học bổng của khoa CNTT. Thông tin cần: MaSV, HoTen, HocBong,TenLop, TenKhoa
  async cau13() {
    const cau13 = 'await this.baiTapService.cau13()';
    return cau13;
  }

  // Câu 14: Cho biết số sinh viên của mỗi lớp
  async cau14() {
    const cau14 = 'await this.baiTapService.cau14()';
    return cau14;
  }

  // Câu 15: Cho biết số lượng sinh viên của mỗi khoa.
  async cau15() {
    const cau15 = 'await this.baiTapService.cau15()';
    return cau15;
  }

  // Câu 16: Cho biết số lượng sinh viên nữ của mỗi khoa.
  async cau16() {
    const cau16 = 'await this.baiTapService.cau16()';
    return cau16;
  }

  // Câu 17: Cho biết tổng tiền học bổng của mỗi lớp
  async cau17() {
    const cau17 = 'await this.baiTapService.cau17()';
    return cau17;
  }

  // Câu 18: Cho biết tổng số tiền học bổng của mỗi khoa
  async cau18() {
    const cau18 = 'await this.baiTapService.cau18()';
    return cau18;
  }

  // Câu 19: Lập danh sánh những khoa có nhiều hơn 100 sinh viên. Danh sách cần: MaKhoa, TenKhoa, Soluong
  async cau19() {
    const cau19 = 'await this.baiTapService.cau19()';
    return cau19;
  }

  // Câu 20: Lập danh sánh những khoa có nhiều hơn 50 sinh viên nữ. Danh sách cần: MaKhoa, TenKhoa, Soluong
  async cau20() {
    const cau20 = 'await this.baiTapService.cau20()';
    return cau20;
  }

  // Câu 21: Lập danh sách những khoa có tổng tiền học bổng >=1000000.
  async cau21() {
    const cau21 = 'await this.baiTapService.cau21()';
    return cau21;
  }

  // Câu 22: Lập danh sách sinh viên có học bổng cao nhất
  async cau22() {
    const cau22 = await this.sinhVienModel.findOne().sort('-hocBong');
    return cau22;
  }

  // Câu 23: Lập danh sách sinh viên có điểm thi môn CSDL cao nhất
  async cau23() {
    const monCSDLId = '62300411ed9b0c051eae6067';
    const cau23 = await this.ketQuaModel
      .findOne({ maMH: monCSDLId })
      .sort('-diemThi')
      .populate('maSV')
      .populate({ path: 'maMH', select: 'id tenMH' });
    return cau23;
  }

  // Câu 24: Lập danh sách những sinh viên không có điểm thi môn CSDL.
  async cau24() {
    // Tìm tất cả id sinh viên đã có điểm thi csdl trong model điểm thi
    // Tìm tất cả sinh viên không có id sinh viên
    const monCSDLId = '62300411ed9b0c051eae6067';
    const cau24 = await this.ketQuaModel
      .find({ maMH: monCSDLId, diemThi: { $exists: false } })
      .populate('maSV')
      .populate({ path: 'maMH', select: 'id tenMH' });
    return cau24;
  }

  // Câu 25: Cho biết những khoa nào có nhiều sinh viên nhất
  async cau25() {
    const cau25 = 'await this.baiTapService.cau25()';
    return cau25;
  }
}

// 13/25
