#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { ExamServiceStack } from '../lib/exam-service-stack';

const app = new cdk.App();
new ExamServiceStack(app, 'ExamService');
