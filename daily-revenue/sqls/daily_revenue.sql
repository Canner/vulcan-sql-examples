{% cache %}

select 
  *
from daily_revenue
where orderdate >= {{ context.params.startdate }}
  and orderdate <= {{ context.params.enddate }}

{% endcache %}


