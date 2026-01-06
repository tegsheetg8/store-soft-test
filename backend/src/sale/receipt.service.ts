import { Injectable } from '@nestjs/common';
import { Sale } from '../entities/sale.entity';

@Injectable()
export class ReceiptService {
  generateReceipt(sale: Sale): string {
    const storeName = 'STORE POS SYSTEM';
    const date = new Date(sale.createdAt).toLocaleString();
    
    let receipt = `
================================
    ${storeName}
================================
Date: ${date}
Receipt #: ${sale.id}
Cashier: ${sale.user.username}
--------------------------------
`;

    sale.items.forEach((item) => {
      const subtotal = Number(item.quantity) * Number(item.price);
      receipt += `${item.product.name}\n`;
      receipt += `  ${item.quantity} ${item.product.unit.shortName} x ${Number(item.price).toFixed(2)} = ${subtotal.toFixed(2)}\n`;
    });

    receipt += `--------------------------------
Subtotal: ${Number(sale.totalAmount).toFixed(2)}
Paid: ${Number(sale.paidAmount).toFixed(2)}
Change: ${Number(sale.changeAmount).toFixed(2)}
================================
    Thank You!
================================
`;

    return receipt;
  }

  generateReceiptHTML(sale: Sale): string {
    const storeName = 'STORE POS SYSTEM';
    const date = new Date(sale.createdAt).toLocaleString();
    
    let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Receipt #${sale.id}</title>
  <style>
    body {
      font-family: 'Courier New', monospace;
      width: 300px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      border-bottom: 2px dashed #000;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .item {
      margin: 5px 0;
    }
    .item-name {
      font-weight: bold;
    }
    .item-details {
      font-size: 0.9em;
      margin-left: 10px;
    }
    .total {
      border-top: 2px dashed #000;
      margin-top: 10px;
      padding-top: 10px;
      text-align: right;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      border-top: 2px dashed #000;
      padding-top: 10px;
    }
    @media print {
      body { margin: 0; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>${storeName}</h2>
    <p>Date: ${date}</p>
    <p>Receipt #: ${sale.id}</p>
    <p>Cashier: ${sale.user.username}</p>
  </div>
  <div class="items">
`;

    sale.items.forEach((item) => {
      const subtotal = Number(item.quantity) * Number(item.price);
      html += `
    <div class="item">
      <div class="item-name">${item.product.name}</div>
      <div class="item-details">
        ${item.quantity} ${item.product.unit.shortName} x ${Number(item.price).toFixed(2)} = ${subtotal.toFixed(2)}
      </div>
    </div>
`;
    });

    html += `
  </div>
  <div class="total">
    <p>Subtotal: ${Number(sale.totalAmount).toFixed(2)}</p>
    <p>Paid: ${Number(sale.paidAmount).toFixed(2)}</p>
    <p><strong>Change: ${Number(sale.changeAmount).toFixed(2)}</strong></p>
  </div>
  <div class="footer">
    <p>Thank You!</p>
  </div>
</body>
</html>
`;

    return html;
  }
}

