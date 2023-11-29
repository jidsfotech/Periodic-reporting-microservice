# Transaction Report Microservice

The Transaction Report Scheduler is a microservice designed for generating financial transaction reports for users. These reports are generated in PDF format and can be delivered to users via email or WhatsApp. The service operates on a periodic schedule, producing reports on a daily, weekly, and monthly basis.

## Features

- **Periodic Report Generation:** Utilizes Node.js cron jobs to automate the generation of financial transaction reports on a daily, weekly, and monthly schedule.

- **Advanced Messaging Queueing Protocol (AMQP):** Implements AMQP as a robust and efficient message broker for handling communication between different components of the system.

- **PDF Conversion with Puppeteer:** Employs Puppeteer, a headless browser automation tool, for converting HTML reports to PDF format. This ensures a seamless and standardized format for the generated reports.

## Usage

To integrate this microservice into your project, follow these steps:

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Configuration:**
   Configure the necessary settings such as email and WhatsApp integration in the configuration files.

3. **Run the Microservice:**
   ```bash
   npm start
   ```

## Dependencies

- Node.js
- Cron
- Advanced Messaging Queueing Protocol (AMQP)
- Puppeteer

## Contributing

Feel free to contribute to the development of this microservice by submitting bug reports, feature requests, or directly contributing to the codebase. Follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This microservice is licensed under the [MIT License](LICENSE).

# To Run

git clone https://github.com/jidsfotech/Periodic-reporting-microservice.git
npm install
npm start
