# Cô Hai Phin Coffee

Mã nguồn Next.js App Router chuyển từ website Cô Hai Phin, phiên bản Sites 8
(commit `f8e7ce3dc627494f276f6bb0e730b2b5965e8935`).

## Chạy trên máy

Yêu cầu Node.js 20.9 trở lên và npm.

```sh
npm ci
npm run dev
```

Mở `http://localhost:3000`. Giao diện mặc định bằng tiếng Việt. Dùng nút VI / EN
hoặc đường dẫn `/?lang=en` để mở bản tiếng Anh.

## Xuất bản

```sh
npm run build
```

Bản build tĩnh nằm trong `out/`. Đưa toàn bộ thư mục này lên dịch vụ lưu trữ
website tĩnh và phục vụ tại đường dẫn gốc của tên miền.

## Cấu trúc

| Vị trí | Nội dung |
| --- | --- |
| `app/` | Route trang chủ, metadata và CSS gốc |
| `components/` | Trang chính, danh mục React và cửa sổ chi tiết |
| `lib/content.js` | Nội dung Việt–Anh và dữ liệu sản phẩm |
| `public/assets/` | Hình ảnh, logo và font của website |

Các liên kết liên hệ sử dụng email đang có trên website. Phần chuyển ngôn ngữ,
bộ lọc và cửa sổ chi tiết chạy trong trình duyệt.
