import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'node:crypto';

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

@Injectable()
export class R2Service {
  private client: S3Client;

  constructor(private config: ConfigService) {
    this.client = new S3Client({
      region: 'auto',
      endpoint: `https://${config.get('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.get('R2_ACCESS_KEY_ID', ''),
        secretAccessKey: config.get('R2_SECRET_ACCESS_KEY', ''),
      },
    });
  }

  async presignUpload(contentType: string, folder: 'products' | 'collections' | 'ig') {
    if (!ALLOWED_TYPES.has(contentType)) throw new Error('Unsupported content type');
    const ext = contentType.split('/')[1].replace('jpeg', 'jpg');
    const key = `${folder}/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.${ext}`;

    const url = await getSignedUrl(
      this.client,
      new PutObjectCommand({
        Bucket: this.config.get('R2_BUCKET', 'tar-media'),
        Key: key,
        ContentType: contentType,
      }),
      { expiresIn: 600 },
    );

    return {
      uploadUrl: url,
      publicUrl: `${this.config.get('R2_PUBLIC_BASE_URL')}/${key}`,
      key,
    };
  }
}
