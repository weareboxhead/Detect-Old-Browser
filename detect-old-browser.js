/* globals Modernizr */

(function() {
	'use strict';

	/*
		Creates and appends the warning message to the top of the body
	*/
	function showWarning() {
		var body = document.body,
			warning = document.createElement('div'),
			paragraph = document.createElement('p'),
			link = document.createElement('a');

		// Add the class to the warning
		warning.className += 'browsehappy';
		warning.appendChild(paragraph);

		// Set the paragraph contents
		paragraph.appendChild(document.createTextNode('It looks like you are using an old browser! To access this site as intended, please view on a smartphone or '));
		paragraph.appendChild(link);
		paragraph.appendChild(document.createTextNode('.'));

		// Set the link attributes
		link.setAttribute('href', 'http://browsehappy.com/');
		link.setAttribute('target', '_blank');
		link.appendChild(document.createTextNode('modern desktop browser'));

		// Add the warning to the body
		body.insertBefore(warning, body.childNodes[0]);
	}

	/*
		Creates a new config object, using the passed overrides
	*/
	function Config(overrides) {
		// If we have any overrides
		if (overrides) {
			// If we have been passed the debug mode override
			if (overrides.debug) {
				// Set that up
				this.debug = true;
			}

			// If we have been passed any feature overrides
			if (overrides.features) {
				// Update required
				this.updateRequiredFeatures(overrides.features);
			}

			// If we have been passed the force warning override
			if (overrides.forceWarning) {
				this.forceWarning = true;
			}
		}
	}

	// Default to not debug mode
	Config.prototype.debug = false;
	// Default required features
	Config.prototype.requiredFeatures = ['csstransforms3d', 'csstransitions', 'flexbox', 'flexwrap', 'history'];

	/*
		Overrides the defaults
	*/
	Config.prototype.updateRequiredFeatures = function(features) {
		// For each feature in the overrides
		for (var feature in features) {
			// Add it if it required
			if (features[feature] === true) {
				this.addRequiredFeature(feature);
			// Remove it if it is not required
			} else {
				this.removeRequredFeature(feature);
			}
		}
	};

	/*
		Adds a feature to the required features array
	*/
	Config.prototype.addRequiredFeature = function(feature) {
		// If the feature was not found
		if (this.getFeatureIndex(feature) === -1) {
			// Add it
			this.requiredFeatures.push(feature);
		}
	};

	/*
		Removes a feature from the required features array
	*/
	Config.prototype.removeRequredFeature = function(feature) {
		var featureIndex = this.getFeatureIndex(feature);

		// If the feature was found
		if (featureIndex > -1) {
			// Remove it
			this.requiredFeatures.splice(featureIndex, 1);
		}
	};

	/*
		Returns the index of a given feature in the required features array
	*/
	Config.prototype.getFeatureIndex = function(feature) {
		return this.requiredFeatures.indexOf(feature);
	};

	/*
		Returns true if Modernizr has tested this feature and it is supported
	*/
	function featureSupported(feature) {
		return Modernizr[feature];
	}

	/*
		For some features, there might be e.g. an alternative syntax / old implementation which we
		can use. This checks for an alternative feature which is avaiable if the main one is not.
	*/
	function alternativeFeatureSupported(feature) {
			// Group features for which only one needs to be supported
		var alternativeFeatureGroups = [
				['flexbox', 'flexboxtweener']
			],
			group,
			alternativeFeature;

		// For each alternative feature group
		for (var i = 0; i < alternativeFeatureGroups.length; i++) {
			group = alternativeFeatureGroups[i];

			// If this group contains our feature
			if (group.indexOf(feature) > -1) {
				// For each feature in this group
				for (var j = 0; j < group.length; j++) {
					alternativeFeature = group[j];

					// If this is actually the feature we are trying to find alternatives for
					if (alternativeFeature === feature) {
						// Continue onto the next one
						continue;
					}

					// If this feature is supported
					if (featureSupported(alternativeFeature)) {
						// Log if debug mode
						if (config.debug) {
							console.log('An alternative feature ("' + alternativeFeature + '") for required feature "' + feature + '" is supported.');
						}

						// We have successfully found an alternative
						return true;
					}
				}
			}
		}

		// If we are here, then there are no tested supported alternatives
		return false;
	}

	/*
		Tests for if a feature is supported in its own right, or if there is an alternative
		feature which is supported
	*/
	function testFeature(feature) {
		// If this feature is supported
		if (featureSupported(feature)) {
			// Log if debug mode
			if (config.debug) {
				console.log('Required feature "' + feature + '" is supported.');
			}

			return true;
		}

		// If an alternative feature is supported
		if (alternativeFeatureSupported(feature)) {
			return true;
		}

		// If we have got this far, this feature is not supported
		return false;
	}

	/*
		Tests all required features to check if any have been detected with a false result
	*/
	function testFeatures() {
		var requiredFeatures = config.requiredFeatures,
			oldBrowser = false,
			feature;

		// For each required feature
		for (var i = 0; i < requiredFeatures.length; i++) {
			feature = requiredFeatures[i];

			// If this feature has not been tested for support, we can't know if it is supported or not
			if (!Modernizr.hasOwnProperty(feature)) {
				// Warn if debug mode
				if (config.debug) {
					console.warn('Required feature "' + feature + '" was not tested for support.');
				}

				// Continue on to the next feature
				continue;
			}

			// If this feature is not supported
			if (!testFeature(feature)) {
				// Log if debug mode
				if (config.debug) {
					console.log('Required feature "' + feature + '" is not supported.');
				}

				oldBrowser = true;

				// We don't need to perform any other tests
				break;
			}
		}

		// If this is an old browser or we are to force the warning, show it
		if (oldBrowser || config.forceWarning) {
			showWarning();
		}
	}

	/*
		Run!
	*/
	function detectOldBrowser(overrides) {
		config = new Config(overrides);

		// If Modernizr is not defined
		if (typeof Modernizr === 'undefined') {
			// Warn if debug mode
			if (config.debug) {
				console.warn('Modernizr is not defined');
			}

			// Don't go on
			return;
		}

		testFeatures();
	}

	var config;

	// Leak detectOldBrowser to global namespace
	window.detectOldBrowser = detectOldBrowser;
})();