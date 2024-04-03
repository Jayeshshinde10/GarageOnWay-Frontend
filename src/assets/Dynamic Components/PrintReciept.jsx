import React from 'react';

function PrintableReceipt({ receiptData }) {
  const {
    id,
    is_Approved,
    is_Completed,
    is_paid,
    is_cancelled,
    vehicle_name,
    description,
    request_type,
    request_time,
    approval_time,
    completion_time,
    payment_time,
    organization_name,
    appointment_time,
    price,
    customer_id,
    ServiceProvider_id,
    Service_id,
    payment_mode
    // Add any other fields you have in your data
  } = receiptData;

  const handlePrintInNewWindow = () => {
    const receiptWindow = window.open('', '_blank', 'width=800,height=600');

    const receiptHTML = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Receipt #${id}</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background: linear-gradient(45deg, #283048, #859398);
              color: #fff;
              padding: 20px;
            }
            .receipt-container {
              width: 80%;
              margin: auto;
              background-color: rgba(255, 255, 255, 0.1);
              border-radius: 10px;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            }
            .receipt-title {
              font-size: 24px;
              text-align: center;
              margin-bottom: 20px;
            }
            .receipt-status {
              font-size: 18px;
              text-align: center;
              margin-bottom: 20px;
            }
            .detail-label {
              font-weight: bold;
              color: #FFD700;
            }
            .detail-value {
              color: #F9F3E6;
            }
            .summary-label {
              font-weight: bold;
              color: #FFD700;
            }
            .summary-value {
              color: #F9F3E6;
              font-size: 20px;
              margin-top: 10px;
            }
            .receipt-footer {
              text-align: center;
              margin-top: 20px;
            }
            .print-btn {
              display: block;
              width: 100%;
              background-color: #FF6347;
              color: #fff;
              border: none;
              padding: 10px 20px;
              font-size: 18px;
              border-radius: 5px;
              cursor: pointer;
              transition: background-color 0.3s ease;
            }
            .print-btn:hover {
              background-color: #FF4500;
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <header>
              <h1 class="receipt-title">Receipt #${id}</h1>
              <div class="receipt-status">
                <p>
                  ${is_Approved ? 'Approved' : 'Not Approved'} - 
                  ${is_Completed ? 'Completed' : 'Not Completed'} - 
                  ${is_paid ? 'Paid' : 'Not Paid'}
                </p>
              </div>
            </header>
            <main>
              <section>
                <ul>
                  <li>
                    <span class="detail-label">Vehicle Name:</span>
                    <span class="detail-value">${vehicle_name}</span>
                  </li>
                  <li>
                    <span class="detail-label">Description:</span>
                    <span class="detail-value">${description}</span>
                  </li>
                  <li>
                    <span class="detail-label">Request Type:</span>
                    <span class="detail-value">${request_type}</span>
                  </li>
                  <li>
                    <span class="detail-label">Request Time:</span>
                    <span class="detail-value">${request_time?.toLocaleString() || request_time}</span>
                  </li>
                  <li>
                    <span class="detail-label">Approval Time:</span>
                    <span class="detail-value">${approval_time?.toLocaleString() || approval_time}</span>
                  </li>
                  <li>
                    <span class="detail-label">Completion Time:</span>
                    <span class="detail-value">${completion_time?.toLocaleString() || completion_time}</span>
                  </li>
                  <li>
                    <span class="detail-label">Payment Time:</span>
                    <span class="detail-value">${payment_time?.toLocaleString() || payment_time}</span>
                  </li>
                  <li>
                    <span class="detail-label">Organization Name:</span>
                    <span class="detail-value">${organization_name}</span>
                  </li>
                  <li>
                    <span class="detail-label">Appointment Time:</span>
                    <span class="detail-value">${appointment_time?.toLocaleString() || appointment_time}</span>
                  </li>
                  <li>
                    <span class="detail-label">Payment Mode:</span>
                    <span class="detail-value">${payment_mode}</span>
                  </li>
                </ul>
              </section>
              <section>
                <p class="summary-label">Price:</p>
                <p class="summary-value">₹${price.toFixed(2)}</p>
              </section>
            </main>
            <footer class="receipt-footer">
              <p>Thank you for your business!</p>
            </footer>
          </div>
          <button class="print-btn" onclick="window.print()">Print Receipt</button>
        </body>
      </html>`;

    receiptWindow.document.write(receiptHTML);
    receiptWindow.document.close();
  };

  return (
    <div className="receipt-container">
      {/* Add rest of your component content here */}
      <button className="print-btn bg-green btn-sm bg-teal-400 p-2 m-1 rounded" onClick={handlePrintInNewWindow}>Print Receipt</button>
    </div>
  );
}

export default PrintableReceipt;
