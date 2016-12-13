# Detect Old Browser JS

Determines support for a given list of features (using the excellent [Modernizr][modernizr] library) and displays a styleable warning message if the browser does not support one or more of them.

## Usage

Include [Modernizr][modernizr] in your project, and include relevant [feature detections](#feature-detections).

	detectOldBrowser([options]);

The warning message output will be formatted as follows, and can be styled through the `browsehappy` class.

	<div class="browsehappy">
		<p>It looks like you are using an old browser! To access this site as intended, please view on a smartphone or <a href="http://browsehappy.com" target="_blank">modern desktop browser</a>.</p>
	</div>

### Feature Detections

For each feature you consider 'required' for a modern browser, make sure you add that test to [Modernizr][modernizr], along with any relevant [feature alternatives](#feature-alternatives).

#### Default Features Tested

Default features tested for support are `csstransforms3d`, `csstransitions`, `flexbox`, `flexwrap`, and `history`.

#### Feature Alternatives

For some features, there might be an alternative syntax or old implementation which we
can use. An example would be that IE10 does not support the current `flexbox` implementation, but does support `flexboxtweener`. If only one of these is needed, both should be included in the [Modernizr][modernizr] tests and Detect Old Browser will determine whether either are supported.

##### Current Feature Alternative Groups:

- `['flexbox', 'flexboxtweener']`

## options

### features

Type: `Object`

Specific features which you require the browser to support for it not to be considered 'old'. [Default features tested for](#default-features-tested). Can add as well as remove defaults e.g.

	detectOldBrowser({
		features: {
			canvas: true,
			flexbox: false		
		}
	});

### forceWarning

Forces Detect Old Browser to show the warning message even if the browser is not determined as old. Useful for styling the warning banner / checking how it will display.

### debug

Type: `Boolean`

In debug mode, Detect Old Browser will `console` `log`s and `warn`s to help you understand what is going on. This is helpful for highlighting a required feature which has not been tested for with [Modernizr][modernizr] (and therefore Detect Old Browser is unable to determine whether or not it is supported), as well as tracing which features it considers supported (including alternatives) or not.

## Roadmap
- Add more [feature alternative groups](#current-feature-alternative-groups).

[modernizr]: https://modernizr.com/
[autoprefixer]: https://www.npmjs.com/package/autoprefixer