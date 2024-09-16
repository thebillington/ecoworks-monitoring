/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "ecoworks-monitoring-system",
      home: "aws",
      removal: "remove",
      providers: {
        aws: {
          region: "eu-west-2",
          profile: "aws-personal"
        }
      },
    };
  },
  async run() {
    new sst.aws.Nextjs(
      "EcoworksMonitoringSystem",
      {
        domain: {
          name: "monitoring.ecoworks.org.uk",
          dns: false,
          cert: process.env.AWS_CERTIFICATE_AUTHORITY_ARN
        }
      }
    );
  },
});
