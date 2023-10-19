export interface Config {
  mysql: MysqlCred;
  nodeMailerCred: NodeMailer;
}

export interface MysqlCred {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export interface NodeMailer {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
}

export interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  attachments: [
    {
      path: string;
    },
  ];
}
