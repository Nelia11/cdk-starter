import * as cdk from 'aws-cdk-lib';
import { Fn } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotosStack extends cdk.Stack {
    private stackSuffix: string;
    public readonly photosBucketArn: string;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        this.initializeSuffix();

        const myBucket = new Bucket(this, 'PhotosBucket', {
            bucketName: `photos-bucket-${this.stackSuffix}`
        });
        this.photosBucketArn = myBucket.bucketArn;
    }

    private initializeSuffix() {
        const shortStackId = Fn.select(2, Fn.split('/', this.stackId))
        this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId))
    }
}