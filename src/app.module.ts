import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { configValidationSchema } from './config.schema';
import { AuthModule } from './auth/auth.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [  
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mongodb',
          url: configService.get('MONGO_URL'),
          synchronize: true,
          autoLoadEntities: true,
          entities: [User],
        };
      },
    }),
    UserModule,
    AuthModule,
    LessonModule
  ],
})
export class AppModule {}
