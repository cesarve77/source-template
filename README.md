# Source Template

Is a source code generator based in simple templates system.

The Main Idea is have a template for your common taks and generate your
code faster.

And provide a better and comfortable way to share the configuration files
for your open source projects.

e.g.

I used have a txt file with the next information:

```
sudo mkdir -p /var/www/<my.domain.com>/httpdocs
sudo chown -R $USER:$USER /var/www/<my.domain.com>/*
sudo chmod -R 755 /var/www/<my.domain.com>

sudo nano /etc/apache2/sites-available/<my.domain.com>.conf

<VirtualHost *:80>
	ServerAdmin info@<my.domain.com>
	ServerName <my.domain.com>
	ServerAlias www.<my.domain.com>
	DocumentRoot /var/www/<my.domain.com>/httpdocs
	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
<Directory "/var/www/<my.domain.com>/httpdocs ">
    AllowOverride All
</Directory>

sudo a2ensite <my.domain.com>
sudo service apache2 restart

```

and  any time I need to create
a new domain, and I replace <my.domain.com> and then I used the code.

Looks no so hard, but what happen when the templates are much complex and longer

Source Template solve this problem creating a way to detect all replaceable data and
asking you one by one and give a usable result, in clipboard or in  downloadable  files




## Install

``` 
#if it has not been installed
npm install --save react 
npm install --save react-dom 
npm install --save simpl-schema 

#install 
npm install --save source-template

```


## Templates
Source Template use [https://handlebarsjs.com/](handlebars) and use the same principle.
For now only 3 blocks are implemented, (is very easy to implement more, and I will, when these are necessary)

1) Simple replace
Just wrap the value inside '{{' '}}'

e.g. 
```
...
render(){

    return (
        <MyComponent prop1={ {{prop1}} }  prop2={ '{{prop2}}' } />
    )
}
...
```
Here the component will ask you for pro1 && prop2 value and will return:
```
...
//you enter prop1='5' and prop2='19'
render(){

    return (
        <MyComponent prop1={ 5 }  prop2={ '19' } } />
    )
}
...
```

2) Loops
Create a block {{#each options}}values of options {{value}}{{/each}} where optioms is a array like [{value:'value1'},{value:'value2'}]



e.g. 
```
...
render(){
    const options=[
        {{#each options}}
            '{{value}}',
        {{/each}}
    ]
    return (
        <MyComponent options={options}  />
    )
}
...
```
Here the component will ask you for options[0].value, options[1].value, , options[2].value... and will give you 
```
...
//you enter options[0].value='1', options[1].value='2', , options[2].value='3'
render(){
    const options=[
       '1',
       '2',
       '3',
    ]
    return (
        <MyComponent options={options}  />
    )
}
...
```

3) If
Create a block {{#if condition}}If line only will be printer if cond is a true value{{/each}} where condition is any value of other var

e.g. 
```
{{#if useComponent1}}
import MyComponent1 from './MyComponent1'
{{else}}
import MyComponent2 from './MyComponent2'
{{/if}}
...
render(){
   
    return (
        {{#if useCompoent1}}
            <MyComponent1 options={[0,1,2]}  />
        {{else}}
            <MyComponent2  options={[0,1,2]}   />
        {{/if}}
    )
}
...
```
Here the component will ask you for useComponent1... and will give you 
```
...
//you enter useComponent1 'no' or false or  any false value
import MyComponent2 from './MyComponent2'
...
render(){
   
    return (
            <MyComponent2  options={[0,1,2]}   />
    )
}
...
```

The example above can be simplify:
```

import {{YourComponent}} from './{{YourComponent}}'
...
render(){
   
    return (
            <{{YourComponent}} options={[0,1,2]}  />
    )
}
...
```


Advance template

You can set  advanced features to teplate fields with comments. Source Template use [https://www.npmjs.com/package/doctrine](doctrine) a [http://usejsdoc.org/](jsDoc) parser

Use @param tag for set your advanced features anywhere in the code, together or separated

e.g.
/**
 * @param {string=} value - there the description of value
 */
 
Where 'value' is the name of the field bettwen {{ }}
Where 'string' is the field type in the form, can be 'val1'|'val2'|'val3' for enum (select)
Where '=' determine if is optional or not, omit for required



## React Component

```js
import React from 'react'
import SourceTemplate from 'source-template'
import buildQuery from './buildQuery'
import saveUserData from './saveUserData'
import getUserData from './getUserData'

const MyComponent=()=>{
    const data={
        Collection: 'Meteor.users',
        publicationName: 'users'
        }
    const publicationsTemplate=`
    Meteor.publish('{{publicationName}}',function(filters,limit){
        const query=buildQuery(filters)
        return {{Collection}}.find(query,{limit})
    }
    `
    const onUserData=saveUserData()
    const userData=getUserData()
    return (
        <SourceTemplate data={data} template={publicationsTemplate} onUserData={onUserData} userData={userData}/>
    )
}
```

SourceTemplate accept 4 properties
* **template**
Required String. String with source code handlebar style template

* **data*** 
Dummy data for showing propouse  

* **onUserData**
Called when the user fill the form and submit, the idea is save this data in a parent component for example 
and shared among the other templates with the same fields

* **userData**
Previous saved, or shared data to prefill the form



![template](https://github.com/cesarve77/source-template/raw/master/docs/source-template-template.png)



![form](https://github.com/cesarve77/source-template/raw/master/docs/source-template-form.png)



## Contribute

Every help or suggest is welcome

And please help me with the english

 