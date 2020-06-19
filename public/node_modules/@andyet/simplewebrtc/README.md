# SimpleWebRTC SDK



This contains the source for the `@andyet/simplewebrtc` npm package
It also generates the documentation for that package.

# SDK

There was no readme here, someone should type this up

# DOCS

All of the documentation code and output is in the `docs/` subdirectory.
The code that generates the documentation is in `docs/src`, and the
output is in `docs/build`.

There is also a README.md file in `docs/build` that appears to be hand
made.


Rebuilding the docs site requires two steps: copying over the sdk data,
and building the site.

First run `npm run docs:data` to copy over the info from the sdk
metadata.

Next run `npm run docs:build` to build the docs site.

To view the docs run `npm run docs:serve` then point your browser to
`http://localhost:3000`

## Publishing SDK to npm

No clue, someone needs to write this

# Deploy Documentation Site

This repo varies from the typical static site deploment process, owing
to the fact that this is a repo for both the sdk and the docs.  The doc
site generation is done by the dev and committed into the repo.

The docs in the `master` branch are automatically deployed to
docsss.simplewebrtc.com.

Running `/deploy` in slack deploys the docs to docs.simplewebrtc.com.

Commits to branches are not deployed.

✨
