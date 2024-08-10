import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotosStack extends cdk.Stack {
    private stackSuffix: string;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        this.initializeSuffix();

        const myBucket = new Bucket(this, 'PhotosBucket', {
            bucketName: `photos-bucket-${this.stackSuffix}`
        });

        (myBucket.node.defaultChild as CfnBucket).overrideLogicalId("PhotoBucketnewlogicalid123456")

        new cdk.CfnOutput(this, 'photos-bucket', {
            value: myBucket.bucketArn,
            exportName: 'photos-bucket'
        })
    }

    private initializeSuffix() {
        const shortStackId = cdk.Fn.select(2, cdk.Fn.split('/', this.stackId))
        this.stackSuffix = cdk.Fn.select(4, cdk.Fn.split('-', shortStackId))
    }
}