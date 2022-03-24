import requests
from bs4 import BeautifulSoup


mens_bags = 'https://www.jumia.com.eg/bags/?page='       

Beauty_health = 'https://www.jumia.com.eg/body-skin-care/?page='        
 
labtops = 'https://www.jumia.com.eg/laptops/?page='       

Smart_phones = 'https://www.jumia.com.eg/smartphones/?page='    

babies = 'https://www.jumia.com.eg/mlp-free-shipping/baby-products/?page='  


products_collection = []

def Making_Data_of_products(url):
    
    li = []
    for i in range(1, 6):   # getting data from 5 pages.
        response = requests.get(url + str(i))
        soup = BeautifulSoup(response.content, 'lxml')

        data = soup.find('div', {'class': '-paxs row _no-g _4cl-3cm-shs'})
        products = data.find_all('article', {'class': 'prd _fb col c-prd'})
        
        for pr in products: 
            title = pr.find('a').find('div', {'class': 'info'}).find('h3').text
            img   = pr.find('a').find('div', {'class': 'img-c'}).find('img', {'class': 'img'})['data-src']
            price = float(pr.find('a').find('div', {'class': 'info'}).find('div', {'class': 'prc'}).text.split()[1].replace(',', ''))
            brand = pr.find('a')['data-brand']
            tags  = pr.find('a')['data-category'].split('/')

            # rating = float(pr.find('a').find('div', {'class': 'info'}).find('div', {'class': 'rev'}).text.split()[0])
            # no_of_rev  = int(pr.find('a').find('div', {'class': 'info'}).find('div', {'class': 'rev'}).text.split()[-1][2:4])

            li.append(
                {
                    'title': title,
                    'price': price,
                    'brand': brand,
                    'image': img,
                    'category': tags[0],
                    'tags': tags,
                    'total_rate': 0,
                    'count_of_ratings': 0,
                    'reviews': []
                }
            )
            
    return li
    
# data of the baby products
Baby_products = Making_Data_of_products(babies)

# data of the smart phones 
SmartPhones_products = Making_Data_of_products(Smart_phones)

# data of the Beauty and helthe products.
BeautyHealth_products = Making_Data_of_products(Beauty_health)

# data of the labtops.
Labtops_products = Making_Data_of_products(labtops)

# data of the mens bags.
MensBagsProducts = Making_Data_of_products(mens_bags)




# just testing
print(Baby_products[0], '\n\n\n', SmartPhones_products[0], '\n\n\n',BeautyHealth_products[0], '\n\n\n',Labtops_products[0], '\n\n\n', MensBagsProducts[0])