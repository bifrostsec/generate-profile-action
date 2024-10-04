# About

GitHub Action to integrate with [bifrost](https://bifrostsec.com/).

This action will generate a security profile for a given service version. It
works by making an [API call](https://docs.bifrostsec.com/api/v2/operations/serviceserviceversionversionprofile) to the
[portal](https://portal.bifrostsec.com) with the required input parameters.

This requires that you have an account registered with bifrost.

## Usage

```yaml
name: bifrost

on:
  push:

jobs:
  bifrost:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Generate security profile
        id: generate-profile
        uses: bifrostsec/generate-profile-action@v1
        with:
          api-token: ${{ secrets.BIFROST_API_KEY }}
          service-name: my-service
          service-version: my-service-version
      - run: |
          echo "Generated profile: ${{ steps.generate-profile.outputs.profile-name }}"
```

## Inputs

| Name              | Type   | Description            |
|-------------------|--------|------------------------|
| `api-token`       | String | API Token              |
| `service-name`    | String | Name of the service    |
| `service-version` | String | Version of the service |

## Output

The following outputs are available:

- `profile-name`: Name of the generated security profile
