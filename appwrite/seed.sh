#!/bin/sh

# Schema Setup

appwrite deploy collection --all --yes
appwrite deploy function --all --yes

appwrite storage createBucket --bucketId 'thumbnails' --name 'thumbnails' --fileSecurity 'true' --permissions 'read("any")' --permissions 'update("team:admins")' --permissions 'delete("team:admins")'  --maximumFileSize '5242880' --allowedFileExtensions 'png' --allowedFileExtensions 'jpg' --allowedFileExtensions 'jpeg'
appwrite storage createBucket --bucketId 'profilePictures' --name 'profilePictures' --fileSecurity 'true' --permissions 'read("any")' --permissions 'create("users")' --permissions 'update("team:admins")' --permissions 'delete("team:admins")'  --maximumFileSize '5242880' --allowedFileExtensions 'png' --allowedFileExtensions 'jpg' --allowedFileExtensions 'jpeg'

# Categories

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'startups' --data '{"name":"Startups","description":"Tech startup coverage that breaks down the funding, growth, and long-term trajectory of companies across every stage and industry, including climate, crypto, fintech, SaaS, transportation, and consumer tech.","hidden":false}'

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'venture' --data '{"name":"Venture","description":"Our venture capital coverage features all the VCs, the VC-backed startups, and the investment trends that founders, investors, students, corp development pros, academics - and anyone else interested in the way that tech is transforming the world - should be tracking.","hidden":false}'

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'security' --data '{"name":"Security","description":"Cybersecurity encompasses investigative reporting and analysis on the latest security breaches, hacks and cyberattacks around the globe.","hidden":false}'

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'robotics-ai' --data '{"name":"AI","description":"Bleeding edge robotics companies and AI startups, focused on a wide range of automation categories, including logotics, ag-tech, delivery, healthcare, home robotics and food service, along with the latest university and laboratory research into soft robotics, nano robotics and more.","hidden":false}'

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'cryptocurrency' --data '{"name":"Crypto","description":"Cryptocurrency coverage and news on Bitcoin, Ethereum and the blockchain startups building the future of crypto, web3 using tokens and NFTs.","hidden":false}'

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'apps' --data '{"name":"Apps","description":"The app economy continues to grow, having produced a record number of downloads and consumer spending across both the iOS and Google Play stores. Keep up with this fast-moving industry in one place, with the latest from the world of apps, including news, updates, startup fundings, mergers and acquisitions, and much more.","hidden":false}'

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'events' --data '{"name":"Events","description":"Be the first to hear about the latest TechScrunch events and opportunities.","hidden":false}'

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'code' --data '{"name":"Code","description":"All news about your most favourite coding language, framework or technology. It's trendy? We got it!","hidden":false}'
