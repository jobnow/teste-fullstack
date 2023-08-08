import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './files.controller';
import { FilesMiddleware } from './files.middleware';
import { FilesService } from './files.service';
import { File } from './entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FilesMiddleware).forRoutes('/files');
  }
}
