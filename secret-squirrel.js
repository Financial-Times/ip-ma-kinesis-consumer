module.exports = {
	files: {
		allow: [
			'.eslintrc',
			'deploy/app.tpl.properties',
			'pom.xml'
		],
		allowOverrides: []
	},
	strings: {
		deny: [],
		denyOverrides: [
			'584010ed69bff20400ec3dd6', // app/records/recordFilter.js:15, app/records/recordFilter.test.js:12
			'vOk6uEMctu0vQrvuSqFdJyqj1Q0S5VTDL79qtjo\\+', // package-lock.json:26
			'3MYsjlwGTi0tjQ9ANXZu4', // package-lock.json:501
			'h393OLeHKYccmhBeO4N9K', // package-lock.json:692
			'/\\+\\+YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw', // package-lock.json:882|3819|4806|5064|5306
			'wOcfdRHaZ7VWtqCztfHri', // package-lock.json:882|3819|4806|5064|5306
			't5Zpu0LstAn4PVg8rVLKF', // package-lock.json:916
			'/x3dGFT9UBZnkLxCwua/IXBi2TYnwTEpsOvhC4UQ', // package-lock.json:1106
			'0xUo9AGIEwyEHv3XgmTlw', // package-lock.json:1259
			'04fXhMKdCPhjwbqAa6HXWaMxj8Q4hQDIh7IadJQw', // package-lock.json:1404|1404
			'xxHRdYnKtcECzVg7xOWhflvJMnqcFZjw', // package-lock.json:1470
			'aLt95pexaugVtQerpmE51', // package-lock.json:1506
			'/6WlbVge9bhM74OpNPQPMGUToDtz\\+KXa1PneJxOA', // package-lock.json:1548|3543
			'wcS5vuPglyXdsQa3XB4wH', // package-lock.json:1634
			'M8GDrPGTJ27KqYFDpp6Uv', // package-lock.json:1714
			'FuZJMVWyNaIDr4RGmaSYw', // package-lock.json:2081
			'/abLGzEnPENCQwmHf7sck8Oyu4ob3LgBxWWxRoM\\+', // package-lock.json:2165
			'PaQqUC9SRmAiSA9CCCYd4', // package-lock.json:2198
			'/YFdLrom0lRx1BHfRYskFHfIMVkGdp8\\+dIZaxuU\\+', // package-lock.json:2203
			'dge4ujbXMJrnihYMcL4AoOweGnw9Tp3kQuqy1Kx5c1qKjqvMJZ6nVJPMWJtKCTN72ZogH3oeSO9g9rXQ', // package-lock.json:2240
			'phJfQVBuaJM5raOpJjSfkiD6BpbCE4Ns', // package-lock.json:2277
			'2eis5WqQGV7peooDyLmNEPUrps9\\+SXX5c9pL3xEB', // package-lock.json:2361
			'rEaBd8SUNAWgkvyPKXYMb', // package-lock.json:2401
			'2uZe4gOKrorLyGqxCeNpM', // package-lock.json:2431
			'OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK', // package-lock.json:2611|2713
			'/0VNQQF74/H9KB67hsHJqGiwTWQC6XO5Azs7kLWm', // package-lock.json:2863
			'CbcG379L1e\\+mWBnLvHWWeLs8GyV/EMw862uLI3c\\+', // package-lock.json:3029
			'SG9rTX95BYNmau8rGFfCeaT6T5OW1C2A', // package-lock.json:3045
			'/ad/2oNbKtW9Hgovl5O1FvFWKkKblNXoN/Oou6\\+9', // package-lock.json:3726
			'IKdSTiDWCarf2JTS5e9e2', // package-lock.json:3753
			'PBrfhx6pzWyUMbbqK9dKD', // package-lock.json:4054
			'/whI9pQD35YrARNnhxeiRktSOhSukRLFNlzg6Br/', // package-lock.json:4163
			'M1OkonEQwtRmZv4tEWF2VgpG0JWJ8Fv1PhlgT5\\+B', // package-lock.json:4323
			'TTlYpa\\+OL\\+vMMNG24xSlQGEJ3B/RzEfUlLct7b5G', // package-lock.json:4499
			'wPrplCpVMFuwzXbkecJrb6IYo1iFb0S9v37754mg', // package-lock.json:4499
			'3kuN3aqLeT9h29KTgQT9q', // package-lock.json:4686
			'ZvfOL46v1s7tZeJkyDGzU', // package-lock.json:4701
			'mbKkMdQKsjX4BAL4bRYTj21edOf8cN7XHdYUJEe\\+', // package-lock.json:4848
			'Zn99hVEYcMvKPct1IqNe7', // package-lock.json:4848
			'QPf1RkZmpZy\\+BpuU0bEjcV9npqKjq9Y3kwFUjnxw', // package-lock.json:4881
			'sFtmYqdUK5dAMh85H0LEVFUCO7OhJJe1', // package-lock.json:4881
			'NrQHlS/V/qgv763EYudVwEcMQNxd2lh\\+0VrUByXN', // package-lock.json:4957
			'6XDMfA/BTt87skxqJlO0lAh3Dker5zThcAxG6mKz', // package-lock.json:5125
			'sFtLPeOgc8Pl7kQVOWv0woD87KTXVHPIAE842FGT', // package-lock.json:5528|5528
			'a7rwh3UA02vjTsqlhODbn', // package-lock.json:5712
			'evKGRg15UJHGB9X5j5Z3AFbgZvjUh2yq', // package-lock.json:5810
			'jLBwwKUhi8WtBfsMQlL4bUUcT8sMkAtQinscJAe/', // package-lock.json:5885
			'oTZqweIP51xaGPI4uPa56', // package-lock.json:5894
			'\\+3tHbM87WnSWnENBUvA2pxJPLhQUg5LKwUQHq3r\\+' // package-lock.json:5952
		]
	}
};
