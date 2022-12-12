USE comic_db; 

INSERT INTO category (category_name)
    VALUES ('Comic Book'), 
            ('Collectibles'); 

INSERT INTO product (product_name, description, country, image_url, price, stock, author, release_date, highlighted_item, category_id)
    VALUES ('Mix (Vol. 19)', 'A Japanese Comic about Baseball Match!', 'Japan', './images/mix.webp', 12.99, 5, 'Adachi Mitsuru', '2022-09-07', 1, 1),
            ('The Ravages of Time (Vol.73)', 'A Hong Kong Comic about Wars in Ancient China', 'Hong Kong', './images/revages_of_time.webp', 18.99, 10, 'Chan Mou', '2022-07-26', 0, 1),
            ('Angel Heart 1st Season (Vol.20)', 'Not Available', 'Japan', './images/angel_heart 2.webp', 43.5, 15, 'Hojo Tsukasa', '2022-11-09', 0, 1),
            ('Dragon Ball Super (Vol.19)', 'A Japanese Comic about Chinese Martial Art', 'Japan', './images/dragon_ball.webp', 19.4, 20, 'Toriyama Akira ', '2022-10-14', 1, 1),
            ('The Case File of Kindaichi 30th (Vol.1)', 'A famous Japanese detective Comic. ', 'Japan', './images/Kindaichi.webp', 22.5, 25, 'Sato Fumiya ', '2022-11-30', 1, 1),
            ('Mo Dao Zu Shi Man Hua Ban ( Si)', 'Not Available', 'Taiwan', './images/ghost.webp', 37.99, 30, 'Mo Xiang Tong Xiu', '2022-10-20', 0, 1),
            ('Semantic Error Comic (Vol.1)', 'Award Winning Korea Comic Story ', 'South Korea', './images/semantic_error.webp', 44.99, 35, 'Mo Li ', '2022-11-24', 0, 1),
            ('Sword Art Online Progressive (Vol.8)', 'Not Available', 'Hong Kong', './images/sword_art.webp', 24.8, 30, 'Zhou Ting Xu', '2022-11-25', 0, 1),
            ('Doraemon: Doraemon -Scene Edition', 'Tamashii Nations proudly announces the launch of a new version of Figuarts ZERO DORAEMON!', 'Japan', './images/doramon.jpg', 31.91, 25, '', '2022-08-31', 1, 2),
            ('Godzilla vs. Kong 6" Basic Kong with Battle-Axe Figure', 'Feel the mighty strength of Kong as he enters the ultimate battle royale against Godzilla with bone-crushing primal strength and a legendary new weapon fit for a king!', 'US', './images/kong.jpg', 49.99, 50, '', '2022-02-09', 0, 2),
            ('Daredevil (Vol 7 #6)', 'Elektra finds herself at the center of an international incident that threatens to put her, Matt Murdock and everything they hold dear on a collision course with the Avengers ', 'US', './images/Daredevil Vol 7 N6.png', 8.95, 4, 'Chip Zdarsky', '2022-12-07', 1, 1),
            ('Amazing Spider-Man #319', 'The Scorpion''s Tail Of Woe!', 'US', './images/Amazing Spider-Man 319.png', 36, 23, 'Tom DeFalco', '1989-05-09', 1, 1),
            ('Batman #130', 'The final chapter in the Failsafe arc reaches its brutal and stunning conclusion!', 'US', './images/Batman 130.png', 9.9, 82, 'Chip Zdarsky', '2022-12-07', 0, 1),
            ('Captain Marvel Vol 9 #44', 'REVENGE OF THE BROOD'' PART 2! ', 'US', './images/Captain Marvel Vol 9 N44.png', 8.95, 39, 'C.B. Cebulski', '2016-03-16', 1, 1),
            ('Archie Christmas Spectacular', 'A collection of festive tales', 'US', './images/Archie Christmas Spectacular.png', 6.95, 23, 'Tom Defalco', '2022-12-07', 0, 1),
            ('Green Lantern (1960) Vol 2 #9', 'The battle of the power rings!', 'US', './images/Green Lantern 1960 Vol 2 N9.png', 150, 34, 'John Broome', '1961-12-01', 1, 1),
            ('MAD Magazine #29', 'America''s longest-running satire magazine.', 'US', './images/Mad Magazine 29.png', 16.95, 33, 'Sergio Aragones', '2022-12-01', 0, 1); 

INSERT INTO user (name, email, password)
    VALUES ('keziah', 'keziah@gmai.com', 'aaaaaaa'); 

INSERT INTO review (review_text, product_id, user_id, created_at, updated_at) 
    VALUES ('a very good comic!', 1, 1, now(), now()); 

INSERT INTO comic_db.order (order_ref, status, address, user_id, created_at, updated_at)
    VALUES ('000001', 'P', 'TEST ADDRESS', 1, now(), now()); 

INSERT INTO order_item (order_id, product_id, quantity, total_price, created_at, updated_at)
    VALUES (1, 1, 1, 12.99, now(), now()), 
            (1, 12, 1, 36, now(), now()); 