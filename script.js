#!/usr/bin/env node

const octokit = require('@octokit/rest');

const prefix = process.env.PLUGIN_PREFIX || 'build';
const token = process.env.PLUGIN_TOKEN || process.env.GITHUB_TOKEN;
const number = process.env.DRONE_BUILD_NUMBER;
const sha = process.env.DRONE_COMMIT_SHA;
const url = process.env.DRONE_REMOTE_URL;
const owner = process.env.DRONE_REPO_OWNER;
const repo = process.env.DRONE_REPO_NAME;

const host = url.replace(/^https?\:\/\//, '').split('/')[0];
const ref = `tags/${prefix}${number}`;

const config = {
	host,
	pathPrefix: ''
};

if (host === 'github.com') {
	config.host = 'api.github.com';
} else {
	config.pathPrefix = '/api/v3';
}

const github = octokit(config);

github.authenticate({
    type: 'token',
    token
});

github.gitdata
	.getReference({ owner, repo, ref })
	.then(() => {
		return github.gitdata.deleteReference({ owner, repo, ref });
	})
	.catch(() => Promise.resolve() )
	.then(() => {
		return github.gitdata.createReference({
			owner,
			repo,
			ref: `refs/${ref}`,
			sha
		});
	})
	.then(() => {
		console.log(`Tag ${prefix}${number} was created`);
		process.exit(0);
	})
	.catch(err => {
		console.error(err);
		process.exit(1);
	});
