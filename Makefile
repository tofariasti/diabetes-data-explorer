.PHONY: help install dev build preview lint typecheck test format

help:
	@printf '%s\n' \
		'install     Install dependencies' \
		'dev         Start the Vite dev server' \
		'build       Typecheck and build for production' \
		'preview     Serve the production build' \
		'lint        Run ESLint' \
		'typecheck   Run the TypeScript compiler' \
		'test        Run unit tests' \
		'format      Format source files with Prettier'

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint

typecheck:
	npm run typecheck

test:
	npm run test

format:
	npm run format
