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
      }
    };
  },
  async run() {
    new sst.aws.Nextjs("EcoworksMonitoringSystem");
  },
});
