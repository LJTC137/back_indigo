export class MessageDto {
  message: string = '';
  status: string = '';
  statusCode: number = 0;
  entityId: number = 0;

  constructor(
    message: string,
    status: string,
    statusCode: number,
    entityId: number,
  ) {
    this.message = message;
    this.status = status;
    this.statusCode = statusCode;
    this.entityId = entityId;
  }
}
