# Drone tag plugin

Use: 
```
pipeline:
    tag:
    	image: joshuan/docker-tag-plugin
    	prefix: 'build'
        token: 123456789012345678901234567890
```

Token can be passed through secret ```GITHUB_TOKEN```

## Secrets:

```
GITHUB_TOKEN=123456789012345678901234567890
```

Token from this: https://github.com/settings/tokens

## Attention

Works only with github!

